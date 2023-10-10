"use client";
import { Button, TextField } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const IssuePage = () => {
  return (
    <div className="max-w-lg m-5">
      <Button><Link href="/issues/new">Add New Issue</Link></Button>
      
    </div>
  );
};

export default IssuePage;
