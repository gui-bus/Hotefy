"use client";
import TripSearch from "@/components/home/TripSearch";
import TripTabs from "@/components/home/TripTabs";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data } = useSession();
  return (
    <>
      <TripSearch />
      <TripTabs />
    </>
  );
}
