import { useBackendGet } from "#lib/hooks.js";
import {
  Button,
  List,
  ListItem,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import AppointmentCard from "./AppointmentCard";
import { useEffect, useState } from "react";

import _ from "lodash";

export default function AppointmentList() {
  const { currentUser } = useSelector((state) => state.user);

  const [data, fetchData] = useBackendGet(
    `vendors/${currentUser._id}/appointments`,
    []
  );

  const [activeAppointments, setActiveAppointments] = useState([]);
  const [closedAppointments, setClosedAppointments] = useState([]);
  const [incomingAppointments, setIncomingAppointments] = useState([]);

  useEffect(() => {
    setActiveAppointments(
      _.filter(data, (appointment) => appointment.status === "accepted")
    );

    setIncomingAppointments(
      _.filter(data, (appointment) => appointment.status === "pending")
    );
    setClosedAppointments(
      _.filter(data, (appointment) => appointment.status === "done")
    );
  }, [data]);

  return (
    <div>
      <Tabs id="custom-animation" value="active">
        <TabsHeader>
          <Tab key="pending" value="pending">
            Pending
          </Tab>
          <Tab key="inprogress" value="active">
            In Progress
          </Tab>
          <Tab key="closed" value="closed">
            Closed
          </Tab>
        </TabsHeader>
        <TabsBody
          animate={{
            initial: { y: 250 },
            mount: { y: 0 },
            unmount: { y: 250 },
          }}
        >
          <TabPanel key="pending" value="pending">
            <List>
              {incomingAppointments.length > 0 ? (
                incomingAppointments.map((appointment) => {
                  return (
                    <ListItem
                      key={appointment.id}
                      className="mb-2 border rounded"
                    >
                      <AppointmentCard
                        data={appointment}
                        fetchData={fetchData}
                        // Add this line
                      />
                    </ListItem>
                  );
                })
              ) : (
                <div className="pt-2">
                  You do not have any incoming appointments.{" "}
                </div>
              )}
            </List>
          </TabPanel>
          <TabPanel key="active" value="active">
            <List>
              {activeAppointments.length > 0 ? (
                activeAppointments.map((appointment) => {
                  return (
                    <ListItem
                      key={appointment.id}
                      className="mb-2 border rounded"
                    >
                      <AppointmentCard
                        data={appointment}
                        fetchData={fetchData}
                        // Add this line
                      />
                    </ListItem>
                  );
                })
              ) : (
                <div className="pt-2">
                  You do not have any active appointments.{" "}
                </div>
              )}
            </List>
          </TabPanel>
          <TabPanel key="closed" value="closed">
            <List>
              {closedAppointments.length > 0 ? (
                closedAppointments.map((appointment) => {
                  return (
                    <ListItem
                      key={appointment.id}
                      className="mb-2 border rounded"
                    >
                      <AppointmentCard
                        data={appointment}
                        fetchData={fetchData}
                        onShowModal="" // Add this line
                      />
                    </ListItem>
                  );
                })
              ) : (
                <div className="pt-2">
                  You do not have any closed appointments.{" "}
                </div>
              )}
            </List>
          </TabPanel>
        </TabsBody>
      </Tabs>
    </div>
  );
}
