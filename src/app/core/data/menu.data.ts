import {Menu} from "@model/menu/menu";
import {UserType} from "@model/user/user";

export const menuData: Menu[] = [
  {
    id: 1,
    name: "Dashboard",
    url: "/home",
    icon: "home",
    role: [UserType.HR]
  },
  {
    id: 2,
    name: "Leave Types",
    url: "/leave-types",
    icon: "book",
    role: [UserType.HR, UserType.Manager]
  },
  {
    id: 3,
    name: "Employee",
    url: "/employee",
    icon: "person",
    role: [UserType.HR, UserType.Manager]
  },
  {
    id: 4,
    name: "Leave Balance",
    url: "/leave-balance",
    icon: "account_balance_wallet",
    role: [UserType.Employee]
  },
  {
    id: 4,
    name: "Leave Request",
    url: "/leave-request",
    icon: "announcement",
    role: [UserType.Employee,UserType.HR, UserType.Manager]
  }
]
