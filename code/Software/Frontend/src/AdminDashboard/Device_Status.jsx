import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs, faShieldAlt ,faBarcode} from '@fortawesome/free-solid-svg-icons';
import mqtt from 'mqtt';
import { useState, useEffect } from 'react';

import './Device_Status.css';

function Device_Status(){
    const [mainControllerStatus, setMainControllerStatus] = useState("Unknown");
    //const [scanControllerStatus, setScanControllerStatus] = useState("Unknown");
    //const [securityControllerStatus, setSecurityControllerStatus] = useState("Unknown");
  
    useEffect(() => {
      // Corrected declarations
        const mqttServer = "t305b0a9.ala.asia-southeast1.emqxsl.com";
        const mqttPort = 8883;
        const mqttUser = "e19453";
        const mqttPassword = "r2aphc3NSk3K9SP";
        const mqttTopic = "3yp_device_1/main_module";

      //const scanControllerTopic = "scan_controller_topic";
      //const securityControllerTopic = "security_controller_topic";
  
      const client = mqtt.connect(`ws://${mqttServer}:${mqttPort}`, {
        clientId: "web-client", 
        username: mqttUser,
        password: mqttPassword,
      });
  
      client.on("connect", () => {
        console.log("Connected to MQTT broker");
  
        // Subscribe to topics
        client.subscribe(mqttTopic, (err) => {
          if (!err) {
            console.log(`Subscribed to ${mqttTopic}`);
          }
        });
  
        /*client.subscribe(scanControllerTopic, (err) => {
          if (!err) {
            console.log(`Subscribed to ${scanControllerTopic}`);
          }
        });
  
        client.subscribe(securityControllerTopic, (err) => {
          if (!err) {
            console.log(`Subscribed to ${securityControllerTopic}`);
          }
        });*/
      });
  
      client.on("message", (topic, message) => {
        // Received message from the subscribed topic
        console.log(`Received message: ${message.toString()} from topic: ${topic}`);
  
        // Assuming the message contains the status information
        const status = JSON.parse(message.toString()).status;
  
        // Update state based on the controller type
       // if (topic === mainControllerTopic) {
          setMainControllerStatus(status);
       // } else if (topic === scanControllerTopic) {
         // setScanControllerStatus(status);
       // } else if (topic === securityControllerTopic) {
        //  setSecurityControllerStatus(status);
        //}
      });
  
      return () => {
        // Disconnect the client when the component unmounts
        client.end();
      };
    }, []);
    
    return(
        <div >
      <h2>Device Status</h2>
        <p>Device Summary</p>
      <br />
      <div className="container_for_sales bg-white">
        <div className="row row-1 row-3-md-2 g-4">
          <div className="col">
            <div className="card square-card" style={{ backgroundColor: 'white'}}>
              <div className="card-body_device_status">
                <h5 className="card-title text-center">
                  <FontAwesomeIcon icon={faCogs} size="2x" color="dark" /> <br /><br/><br/>
                  
                  Main Controller<p className="card-text">Status : {mainControllerStatus} </p>
                </h5>
               
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card square-card" style={{ backgroundColor: 'white' }}>
              <div className="card-body_device_status">

                <h5 className="card-title text-center">
                  <FontAwesomeIcon icon={faBarcode} size="2x" color="dark" /><br /><br /><br/>
                  
                  Scan Controller<p className="card-text">Status : .....</p>
                </h5>
                
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card square-card" style={{ backgroundColor: 'white', marginRight:'115px' }}>
              <div className="card-body_device_status">
                <h5 className="card-title text-center">
                  <FontAwesomeIcon icon={faShieldAlt} size="2x" color="dark" /><br /><br/><br/>
                  
                  Security Controller<p className="card-text">Status : online </p>
                </h5>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}

export default Device_Status;