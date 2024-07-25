import React, { useEffect, useState } from "react";
import { gapi } from "gapi-script";

const GoogleFitWidget = () => {
  const [steps, setSteps] = useState(0);
  const CLIENT_ID =
    "597543396945-hg1e9abdivcka6gtbe52cfp3h8okju2o.apps.googleusercontent.com";
  const API_KEY = "AIzaSyAftR0fe6NL8evH5MU7mrt1gsfWrXfaLFk";
  const SCOPES = "https://www.googleapis.com/auth/fitness.activity.read";

  useEffect(() => {
    console.log("heyeye");
    const start = () => {
      gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: [
            "https://www.googleapis.com/discovery/v1/apis/fitness/v1/rest",
          ],
          scope: SCOPES,
        })
        .then(() => {
          console.log("hey2");
          gapi.auth2
            .getAuthInstance()
            .signIn()
            .then(() => {
              console.log("hey3");
              loadFitnessData();
              console.log("hey4");
            });
        });
    };
    console.log("hey5");
    gapi.load("client:auth2", start);
    console.log("hey6");
  }, []);

  const loadFitnessData = () => {
    console.log("hey7");
    console.log("Loading fitness data...");
    const today = new Date();
    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 7);
    console.log("hey8");
    gapi.client.fitness.users.dataset
      .aggregate({
        userId: "me",
        requestBody: {
          aggregateBy: [
            {
              dataTypeName: "com.google.step_count.delta",
              dataSourceId:
                "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps",
            },
          ],
          bucketByTime: { durationMillis: 86400000 },
          startTimeMillis: lastWeek.getTime(),
          endTimeMillis: today.getTime(),
        },
      })
      .then((response) => {
        console.log("hey9");
        console.log("Successfully fetched fitness data:", response.result);
        const result = response.result.bucket;
        const totalSteps = result.reduce((acc, bucket) => {
          return (
            acc +
            bucket.dataset[0].point.reduce(
              (sum, point) => sum + point.value[0].intVal,
              0
            )
          );
        }, 0);
        setSteps(totalSteps);
      })
      .catch((error) => {
        console.error("Error fetching fitness data:", error);
      });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h2 className="text-2xl font-semibold text-indigo-800">
        Google Fit Steps
      </h2>
      <p className="text-lg">Steps in the last 7 days: {steps}</p>
    </div>
  );
};

export default GoogleFitWidget;
