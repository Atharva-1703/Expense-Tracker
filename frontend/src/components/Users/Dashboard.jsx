import React from "react";

import TransactionChart from "../Transactions/TransactionChart";

import TransactionsList from "../Transactions/TransactionsList";

const Dashboard = () => {
  return (
    <>
      <TransactionChart />
      <TransactionsList />
    </>
  );
};

export default Dashboard;
