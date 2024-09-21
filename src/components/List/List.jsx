import React from "react";
import "./List.css";
import Card from "../Card/Card";

let cardCount = 0;
export default function List(props) {
  return (
    <>
      <div className="list-container">
        <div className="list-header">
          <div className="list-header-left">
            {
              {
                status: (
                  <>
                    {
                      {
                        Backlog: (
                          <div className="list-icon">
                            <img src="/Backlog.svg" alt="Backlog" />
                          </div>
                        ),
                        Todo: (
                          <div className="list-icon">
                            <img src="/To-do.svg" alt="Backlog" />
                          </div>
                        ),
                        "In progress": (
                          <div className="list-icon">
                            <img src="/in-progress.svg" alt="Backlog" />
                          </div>
                        ),
                        Done: (
                          <div className="list-icon">
                            <img src="/Done.svg" alt="Backlog" />
                          </div>
                        ),
                        Cancelled: (
                          <div className="list-icon">
                            <img src="/Cancelled.svg" alt="Backlog" />
                          </div>
                        ),
                      }[props.listTitle]
                    }
                  </>
                ),

                user: <></>,
                priority: (
                  <>
                    {
                      {
                        0: (
                          <div className="card-tag-icon">
                            <img src="/No-priority.svg" alt="Backlog" />
                          </div>
                        ),
                        1: (
                          <div className="card-tag-icon">
                            <img src="/LowPriority.svg" alt="Backlog" />
                          </div>
                        ),
                        2: (
                          <div className="card-tag-icon">
                            <img src="/MediumPriority.svg" alt="Backlog" />
                          </div>
                        ),
                        3: (
                          <div className="card-tag-icon">
                            <img src="/MediumPriority.svg" alt="Backlog" />
                          </div>
                        ),
                        4: (
                          <div className="card-tag-icon">
                            <img
                              src="/UrgentPrioritycolour.svg"
                              alt="Backlog"
                            />
                          </div>
                        ),
                      }[props.listTitle]
                    }
                  </>
                ),
              }[props.groupValue]
            }
            <div className="list-title">
              {
                {
                  priority: (
                    <>
                      {props.priorityList
                        ? props.priorityList.map((priorityProperty) =>
                            priorityProperty.priority === props.listTitle ? (
                              <>{priorityProperty.name}</>
                            ) : null
                          )
                        : null}
                    </>
                  ),
                  status: <>{props.listTitle}</>,
                  user: <>{props.listTitle}</>,
                }[props.groupValue]
              }
            </div>
            <div className="list-sum">{cardCount}</div>
          </div>

          <div className="list-header-right">
            <div className="list-add-item">
              <img src="/plus.svg" alt="Backlog" />
            </div>

            <div className="list-option-item">
              <img src="/dotdotdot.svg" alt="Backlog" />
            </div>
          </div>
        </div>

        <div className="list-card-items">
          {props.ticketDetails.map((ticket) => {
            if (ticket.status === props.listTitle) {
              cardCount++;
              return <Card cardDetails={ticket} />;
            } else if (ticket.priority === props.listTitle) {
              cardCount++;
              return <Card cardDetails={ticket} />;
            } else if (ticket.userObj.name === props.listTitle) {
              cardCount++;
              return <Card cardDetails={ticket} />;
            }
            return null;
          }, (cardCount = 0))}
        </div>
      </div>
    </>
  );
}
