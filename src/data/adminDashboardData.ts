export interface StatCardData {
  id: string;
  title: string;
  value: string;
  change: string;
  changeType: "increase" | "decrease";
  comparison: string;
  icon: string;
}

export interface OrderData {
  id: string;
  institution: string;
  date: string;
  amount: number;
  status: "SHIPPED" | "PROCESSING" | "ON HOLD" | "DELIVERED" | "PENDING";
}

export interface ProductData {
  id: string;
  name: string;
  price: number;
  unitsSold: number;
}

export const statCardsData: StatCardData[] = [
  {
    id: "1",
    title: "Total Revenue",
    value: "$1.2M",
    change: "+12.5%",
    changeType: "increase",
    comparison: "Compared to last month",
    icon: "FaDollarSign",
  },
  {
    id: "2",
    title: "Total Orders",
    value: "4,800",
    change: "+8.2%",
    changeType: "increase",
    comparison: "Steady growth this quarter",
    icon: "FaShoppingCart",
  },
  {
    id: "3",
    title: "Pending Orders",
    value: "12",
    change: "-2",
    changeType: "decrease",
    comparison: "Action required for priority shipping",
    icon: "FaClock",
  },
  {
    id: "4",
    title: "Out of Stock",
    value: "5",
    change: "Rapidly",
    changeType: "decrease",
    comparison: "Surgical kits soon",
    icon: "FaExclamationTriangle",
  },
];

export const recentOrdersData: OrderData[] = [
  {
    id: "#MS-9402",
    institution: "Central City Hospital",
    date: "Oct 24, 2024",
    amount: 12450.0,
    status: "SHIPPED",
  },
  {
    id: "#MS-9399",
    institution: "St. Jude Medical Center",
    date: "Oct 23, 2024",
    amount: 8200.0,
    status: "PROCESSING",
  },
  {
    id: "#MS-9385",
    institution: "Exeladate Orthopedics",
    date: "Oct 22, 2024",
    amount: 4120.0,
    status: "ON HOLD",
  },
  {
    id: "#MS-9372",
    institution: "Mayo Clinical Research",
    date: "Oct 21, 2024",
    amount: 24900.0,
    status: "DELIVERED",
  },
];

export const topProductsData: ProductData[] = [
  {
    id: "1",
    name: "Precision Kit Alpha",
    price: 899.0,
    unitsSold: 1240,
  },
  {
    id: "2",
    name: "EndoScoop Pro X",
    price: 2450.0,
    unitsSold: 850,
  },
  {
    id: "3",
    name: "Nitrile Sterile G-1",
    price: 45.0,
    unitsSold: 4200,
  },
  {
    id: "4",
    name: "Spinal Fixation Set",
    price: 5200.0,
    unitsSold: 320,
  },
];

export const chartData = {
  labels: ["JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
  datasets: [
    {
      name: "Surgical Tools",
      data: [2.8, 3.2, 3.8, 4.2, 4.8, 5.2, 5.8],
      percentage: 85,
    },
    {
      name: "Curriculum",
      data: [0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4],
      percentage: 25,
    },
    {
      name: "Maintenance",
      data: [0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6],
      percentage: 10,
    },
  ],
};
