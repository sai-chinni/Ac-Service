import { useState, useEffect } from "react";
import { 
    FaSearch, 
    FaFilter, 
    FaCalendarAlt, 
    FaSync, 
    FaWhatsapp, 
    FaClipboardList, 
    FaCheckCircle, 
    FaClock, 
    FaSpinner 
} from "react-icons/fa";
import api from "../api/api";
import Container from "../components/UI/Container/Container";
import Card from "../components/UI/Card/Card";
import Button from "../components/UI/Button/Button";

const Admin = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [serviceFilter, setServiceFilter] = useState("");
    const [dateFilter, setDateFilter] = useState("");
    const [statusUpdating, setStatusUpdating] = useState({});

    const fetchBookings = async () => {
        setLoading(true);
        try {
            const response = await api.get("/bookings");
            if (response.data.success) {
                // Ensure data is an array
                setBookings(Array.isArray(response.data.data) ? response.data.data : []);
            }
        } catch (error) {
            console.error("Error fetching bookings:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleStatusChange = async (bookingId, newStatus) => {
        setStatusUpdating((prev) => ({ ...prev, [bookingId]: true }));
        try {
            const response = await api.put(`/bookings/${bookingId}/status`, { status: newStatus });
            if (response.data.success) {
                // Update local state
                setBookings((prev) =>
                    prev.map((b) => (b.ID === bookingId ? { ...b, Status: newStatus } : b))
                );
            }
        } catch (error) {
            console.error("Error updating status:", error);
            alert("Failed to update status. Please try again.");
        } finally {
            setStatusUpdating((prev) => ({ ...prev, [bookingId]: false }));
        }
    };

    // Filter logic
    const filteredBookings = bookings.filter((booking) => {
        const matchesSearch =
            booking.Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.Phone?.toString().includes(searchTerm);
        
        const matchesService = serviceFilter === "" || booking.Service === serviceFilter;
        
        const matchesDate = dateFilter === "" || booking.Date === dateFilter;

        return matchesSearch && matchesService && matchesDate;
    });

    // Counts for stats
    const totalCount = bookings.length;
    const pendingCount = bookings.filter((b) => b.Status === "Pending").length;
    const confirmedCount = bookings.filter((b) => b.Status === "Confirmed").length;
    const completedCount = bookings.filter((b) => b.Status === "Completed").length;

    const getStatusStyle = (status) => {
        switch (status) {
            case "Pending":
                return "bg-amber-50 text-amber-600 border-amber-200/50";
            case "Confirmed":
                return "bg-blue-50 text-blue-600 border-blue-200/50";
            case "In Progress":
                return "bg-cyan-50 text-cyan-600 border-cyan-200/50";
            case "Completed":
                return "bg-emerald-50 text-emerald-600 border-emerald-200/50";
            case "Cancelled":
                return "bg-rose-50 text-rose-600 border-rose-200/50";
            default:
                return "bg-slate-50 text-slate-600 border-slate-200/50";
        }
    };

    return (
        <div className="min-h-screen bg-slate-50/50 pt-24 pb-16">
            <Container className="space-y-8">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
                    <div>
                        <h1 className="text-4xl font-extrabold text-gradient-dark tracking-tight">
                            Admin Dashboard
                        </h1>
                        <p className="text-slate-500 text-sm mt-1">
                            Manage your AC service schedules and booking sheets database.
                        </p>
                    </div>
                    <Button onClick={fetchBookings} className="self-start md:self-auto gap-2">
                        <FaSync className={`${loading ? "animate-spin" : ""}`} />
                        Refresh Bookings
                    </Button>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card hover={false} className="p-6 bg-white flex items-center justify-between shadow-sm border border-slate-100">
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Bookings</p>
                            <h3 className="text-3xl font-extrabold text-slate-800 mt-1">{totalCount}</h3>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 text-xl">
                            <FaClipboardList />
                        </div>
                    </Card>

                    <Card hover={false} className="p-6 bg-white flex items-center justify-between shadow-sm border border-slate-100">
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pending</p>
                            <h3 className="text-3xl font-extrabold text-amber-600 mt-1">{pendingCount}</h3>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500 text-xl">
                            <FaClock />
                        </div>
                    </Card>

                    <Card hover={false} className="p-6 bg-white flex items-center justify-between shadow-sm border border-slate-100">
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Confirmed</p>
                            <h3 className="text-3xl font-extrabold text-blue-600 mt-1">{confirmedCount}</h3>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 text-xl">
                            <FaCheckCircle />
                        </div>
                    </Card>

                    <Card hover={false} className="p-6 bg-white flex items-center justify-between shadow-sm border border-slate-100">
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Completed</p>
                            <h3 className="text-3xl font-extrabold text-emerald-600 mt-1">{completedCount}</h3>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500 text-xl">
                            <FaCheckCircle />
                        </div>
                    </Card>
                </div>

                {/* Filters Panel */}
                <Card hover={false} className="p-5 bg-white shadow-sm border border-slate-100">
                    <div className="grid md:grid-cols-4 gap-4 items-center">
                        
                        {/* Search Input */}
                        <div className="relative md:col-span-2">
                            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                            <input
                                type="text"
                                placeholder="Search by customer name or phone..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 placeholder-slate-400 outline-none focus:border-blue-500 transition text-sm"
                            />
                        </div>

                        {/* Service Filter */}
                        <div className="relative">
                            <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
                            <select
                                value={serviceFilter}
                                onChange={(e) => setServiceFilter(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-700 outline-none focus:border-blue-500 transition text-sm cursor-pointer appearance-none"
                            >
                                <option value="">All Services</option>
                                <option>AC Repair & Diagnosis</option>
                                <option>AC Installation / Uninstallation</option>
                                <option>AC Deep Jet Cleaning</option>
                                <option>Gas Filling / Leak Repair</option>
                                <option>Annual Maintenance (AMC)</option>
                            </select>
                        </div>

                        {/* Date Filter */}
                        <div className="relative">
                            <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
                            <input
                                type="date"
                                value={dateFilter}
                                onChange={(e) => setDateFilter(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-700 outline-none focus:border-blue-500 transition text-sm cursor-pointer"
                            />
                        </div>

                    </div>
                </Card>

                {/* Table / List Panel */}
                <Card hover={false} className="bg-white shadow-premium overflow-hidden border border-slate-100 rounded-3xl">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-3 text-slate-400">
                            <FaSpinner className="animate-spin text-3xl text-blue-600" />
                            <span className="text-sm font-semibold">Loading spreadsheet rows...</span>
                        </div>
                    ) : filteredBookings.length === 0 ? (
                        <div className="text-center py-20 space-y-4">
                            <p className="text-slate-400 font-semibold text-lg">No bookings found</p>
                            <p className="text-slate-400 text-sm max-w-sm mx-auto">
                                No records match the selected filters or search terms. Try modifying your criteria.
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50/50 border-b border-slate-100 text-slate-500 font-semibold text-xs tracking-wider uppercase">
                                        <th className="py-4 px-6">ID</th>
                                        <th className="py-4 px-6">Customer</th>
                                        <th className="py-4 px-6">Service Requested</th>
                                        <th className="py-4 px-6">Schedule</th>
                                        <th className="py-4 px-6">Status</th>
                                        <th className="py-4 px-6">Contact Client</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-sm">
                                    {filteredBookings.map((booking) => (
                                        <tr key={booking.ID} className="hover:bg-slate-50/30 transition-colors">
                                            
                                            {/* ID */}
                                            <td className="py-4 px-6 font-bold text-slate-700">
                                                #{booking.ID}
                                            </td>

                                            {/* Customer Name & Phone */}
                                            <td className="py-4 px-6">
                                                <div className="font-semibold text-slate-800">{booking.Name}</div>
                                                <div className="text-xs text-slate-500 font-medium mt-0.5">{booking.Phone}</div>
                                                <div className="text-xs text-slate-400 truncate max-w-xs mt-1">{booking.Address}, {booking.City}</div>
                                            </td>

                                            {/* Service Requested */}
                                            <td className="py-4 px-6">
                                                <div className="font-medium text-slate-800">{booking.Service}</div>
                                                <div className="text-xs text-slate-400 mt-0.5">Brand: {booking.ACBrand || booking["AC Brand"]}</div>
                                            </td>

                                            {/* Date / Time */}
                                            <td className="py-4 px-6">
                                                <div className="font-semibold text-slate-700">{booking.Date}</div>
                                                <div className="text-xs text-slate-500 font-medium mt-0.5">{booking.Time}</div>
                                            </td>

                                            {/* Status Selector */}
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-2">
                                                    {statusUpdating[booking.ID] ? (
                                                        <FaSpinner className="animate-spin text-blue-500" />
                                                    ) : (
                                                        <select
                                                            value={booking.Status}
                                                            onChange={(e) => handleStatusChange(booking.ID, e.target.value)}
                                                            className={`border rounded-lg px-2.5 py-1 text-xs font-semibold outline-none cursor-pointer border-slate-200 transition-colors ${getStatusStyle(booking.Status)}`}
                                                        >
                                                            <option value="Pending">Pending</option>
                                                            <option value="Confirmed">Confirmed</option>
                                                            <option value="In Progress">In Progress</option>
                                                            <option value="Completed">Completed</option>
                                                            <option value="Cancelled">Cancelled</option>
                                                        </select>
                                                    )}
                                                </div>
                                            </td>

                                            {/* WhatsApp Quick Chat */}
                                            <td className="py-4 px-6">
                                                <a 
                                                    href={`https://wa.me/91${booking.Phone}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 font-bold text-xs transition-colors"
                                                >
                                                    <FaWhatsapp />
                                                    WhatsApp
                                                </a>
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </Card>

            </Container>
        </div>
    );
};

export default Admin;
