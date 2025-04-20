const DashboardCard = ({ title, onClick, role }) => (
  <div
    onClick={onClick}
    className="p-6 transition rounded-lg shadow cursor-pointer hover:shadow-md"
  >
    <h2 className="text-lg font-semibold">{title}</h2>
    {role}
  </div>
);

export default DashboardCard;
