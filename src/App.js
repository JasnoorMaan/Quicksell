import React, { useEffect, useState, useCallback } from "react";
import "./App.css";
import axios from "axios";
import List from "./components/List/List";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const statusList = ["In progress", "Backlog", "Todo", "Done", "Cancelled"];
  const userList = [
    "Anoop sharma",
    "Ramesh",
    "Shankar Kumar",
    "Suresh",
    "Yogesh",
  ];
  const priorityList = [
    { name: "No priority", priority: 0 },
    { name: "Low", priority: 1 },
    { name: "Medium", priority: 2 },
    { name: "High", priority: 3 },
    { name: "Urgent", priority: 4 },
  ];

  const [groupVal, setgroupVal] = useState(
    getStateFromLocalStorage() || "status"
  );
  const [orderVal, setorderVal] = useState("title");
  const [cardDetails, setcardDetails] = useState([]);

  const orderDataByVal = useCallback(
    async (cardsArray) => {
      if (orderVal === "priority") {
        cardsArray.sort((a, b) => b.priority - a.priority);
      } else if (orderVal === "title") {
        cardsArray.sort((a, b) => {
          const titleA = a.title.toLowerCase();
          const titleB = b.title.toLowerCase();

          if (titleA < titleB) {
            return -1;
          } else if (titleA > titleB) {
            return 1;
          } else {
            return 0;
          }
        });
      }
      await setcardDetails(cardsArray);
    },
    [orderVal, setcardDetails]
  );

  function saveStateToLocalStorage(state) {
    localStorage.setItem("groupValue", JSON.stringify(state));
  }
  function getStateFromLocalStorage() {
    const storedState = localStorage.getItem("groupValue");
    if (storedState) {
      return JSON.parse(storedState);
    }
    return null;
  }

  useEffect(() => {
    saveStateToLocalStorage(groupVal);
    async function fetchData() {
      const response = await axios.get(
        "https://api.quicksell.co/v1/internal/frontend-assignment"
      );
      await refactorData(response);
    }
    fetchData();
    async function refactorData(response) {
      let ticketArray = [];
      if (response.status === 200) {
        for (let i = 0; i < response.data.tickets.length; i++) {
          for (let j = 0; j < response.data.users.length; j++) {
            if (response.data.tickets[i].userId === response.data.users[j].id) {
              let ticketJson = {
                ...response.data.tickets[i],
                userObj: response.data.users[j],
              };
              ticketArray.push(ticketJson);
            }
          }
        }
      }
      await setcardDetails(ticketArray);
      orderDataByVal(ticketArray);
    }
  }, [orderDataByVal, groupVal]);

  function handleGroupValue(value) {
    setgroupVal(value);
    console.log(value);
  }

  function handleOrderVal(value) {
    setorderVal(value);
    console.log(value);
  }

  return (
    <>
      <Navbar
        groupValue={groupVal}
        orderValue={orderVal}
        handleGroupValue={handleGroupValue}
        handleOrderValue={handleOrderVal}
      />
      <section className="board">
        <div className="board-list">
          {
            {
              status: (
                <>
                  {statusList.map((listItem) => {
                    return (
                      <List
                        groupValue="status"
                        orderValue={orderVal}
                        listTitle={listItem}
                        listIcon=""
                        statusList={statusList}
                        ticketDetails={cardDetails}
                      />
                    );
                  })}
                </>
              ),
              user: (
                <>
                  {userList.map((listItem) => {
                    return (
                      <List
                        groupValue="user"
                        orderValue={orderVal}
                        listTitle={listItem}
                        listIcon=""
                        userList={userList}
                        ticketDetails={cardDetails}
                      />
                    );
                  })}
                </>
              ),
              priority: (
                <>
                  {priorityList.map((listItem) => {
                    return (
                      <List
                        groupValue="priority"
                        orderValue={orderVal}
                        listTitle={listItem.priority}
                        listIcon=""
                        priorityList={priorityList}
                        ticketDetails={cardDetails}
                      />
                    );
                  })}
                </>
              ),
            }[groupVal]
          }
        </div>
      </section>
    </>
  );
}

export default App;
