import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

const features = [
  {
    title: "Personal Chat History",
    description:
      "Keep track of past conversations and resume where you left off.",
  },
  {
    title: "Seamless Continuity",
    description: "Continue conversations smoothly with stored chat history.",
  },
  {
    title: "Smart Memory",
    description: "Recalls important details for more relevant responses.",
  },
  {
    title: "Easy Retrieval",
    description: "Access and review past conversations quickly.",
  },
];

const Welcome = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <Card>
        <CardHeader>
          <CardTitle>Welcome to Your Chat Interface</CardTitle>
          <CardDescription>
            It looks like you haven't selected a chat yet.
          </CardDescription>
        </CardHeader>
        <CardContent>
          Use the sidebar to view and select your previous conversations or
          start a new chat. If you need assistance, feel free to ask!
        </CardContent>
      </Card>
      <div className="hidden sm:flex gap-4 items-center justify-center mt-4 flex-wrap">
        {features.map((feature, i) => (
          <Card key={i} className="flex-1 max-w-[200px] h-[250px] sm:h-[200px] ">
            <CardHeader>
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Welcome;
