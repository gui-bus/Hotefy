'use client'
import React from "react";
import { Spinner } from "@nextui-org/react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Spinner label="Carregando..." color="secondary" />
    </div>
  );
};

export default Loading;
