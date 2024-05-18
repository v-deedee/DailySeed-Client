import React from "react";
import { UserProvider } from "./user.context";
import { TreeProvider } from "./tree.context";
import { SeedProvider } from "./seed.context";
import { HabitProvider } from "./habit.context";
// import { StripeProvider } from "@stripe/stripe-react-native";
const AllProviders = ({ children }) => (
  // <StripeProvider
  //   publishableKey="pk_test_51P7bjf05CJZ8qs7ku8lY5rTRdZsePMf3PvSpBDzFHLWfcSfpt2MMBiQ8PfwhvMffMQ19LvnXca8cDJaD5uunpSUl00qNAJjG5R" // Replace with your Stripe publishable key
  // >
    <UserProvider>
      <SeedProvider>
        <TreeProvider>
          <HabitProvider>{children}</HabitProvider>
        </TreeProvider>
      </SeedProvider>
    </UserProvider>
  // </StripeProvider>
);

export default AllProviders;
