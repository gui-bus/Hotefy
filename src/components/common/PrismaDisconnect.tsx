'use client'
import { prisma } from "@/lib/prisma";
import React, { useEffect } from "react";

const PrismaDisconnect = () => {
  useEffect(() => {
    return () => {
      prisma.$disconnect();
    };
  }, []);
  return <></>;
};

export default PrismaDisconnect;
