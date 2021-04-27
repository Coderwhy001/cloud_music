import React from 'react';
import { Redirect } from "react-router-dom";
import Home from '../components/Home';
import Recommend from '../components/Recommend';
import Singers from '../components/Singers';
import Rank from '../components/Rank';

export default [
  {
    path: "/",
    component: Home,
    routes: [
      {
        path: "/",
        exact: true,
        render: () => (
          <Redirect to={"/recommend"}/>
        )
      },
      {
        path: "/recommend",
        component: Recommend
      },
      {
        path: "/singers",
        component: Singers
      },
      {
        path: "/rank",
        component: Rank
      }
    ]
  }
]