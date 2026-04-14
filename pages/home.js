    import { useState, useEffect } from "react";
    import { View, Text, StyleSheet, 
        TouchableOpacity, 
        ScrollView,
        FlatList,
        Alert } from "react-native";
    import { SafeAreaView } from "react-native-safe-area-context";
    import { MaterialIcons } from "@expo/vector-icons";

    const initialHistory = [
    { id: "1", course: "Mobile Programming", date: "2024-03-25", status: "Present" },
    { id: "2", course: "Web Development", date: "2024-03-24", status: "Absent" },
];

const Home = () => {
    // 1. State untuk riwayat presensi
    const [historyData, setHistoryData] = useState(initialHistory);

    // 2. State untuk status tombol check-in
    const [isCheckedIn, setIsCheckedIn] = useState(false);

    // 3. State untuk jam digital
    const [currentTime, setCurrentTime] = useState("Memuat jam...");

    // 4. useEffect untuk jam real-time
    useEffect(() => {
        //Jalankan timer setiap 1 detik
        const timer = setInterval(() => {
            const timeString = new Date().toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            });
            setCurrentTime(timeString);
        }, 1000);
            
        return () => clearInterval(timer);
    }, []);

    // 5. Fungsi handleCheckIn (LANGKAH 4)
    const handleCheckIn = () => {
        if (isCheckedIn) {
        Alert.alert("Perhatian", "Anda sudah melakukan Check In untuk kelas ini.");
        return;
        }

        // Buat data presensi baru
        const newAttendance = {
        id: Date.now().toString(),
        course: "Mobile Programming",
        date: new Date().toLocaleDateString("id-ID"),
        status: "Present",
        };

        // Tambahkan ke historyData (di paling atas)
        setHistoryData([newAttendance, ...historyData]);

        // Kunci tombol
        setIsCheckedIn(true);

        Alert.alert("Sukses", `Berhasil Check In pada pukul ${currentTime}`);
    };

    // 6. Render item FlatList (sama seperti W2)
    const renderItem = ({ item }) => (
        <View style={styles.historyItem}>
        <View>
            <Text style={styles.courseText}>{item.course}</Text>
            <Text style={styles.dateText}>{item.date}</Text>
        </View>
        <Text
            style={[
            styles.statusText,
            item.status === "Present" ? styles.present : styles.absent,
            ]}
        >
            {item.status}
        </Text>
        </View>
    );

        return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>

                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Attendance App</Text>
                    <Text style={[styles.clock, isCheckedIn ? styles.clockBlue : styles.clockRed]}>
                        {currentTime}
                    </Text>
                </View>

                {/* Profile Card */}
                <View style={styles.card}>
                    <View style={styles.iconCircle}>
                        <MaterialIcons name="person" size={36} color="#555" />
                    </View>
                    <View style={styles.profileInfo}>
                        <Text style={styles.name}>Budi Susanto</Text>
                        <Text style={styles.infoText}>NIM : 0325260031</Text>
                        <Text style={styles.infoText}>Class : Informatika-2B</Text>
                    </View>
                </View>

                {/* Today's Class */}
                <View style={styles.classCard}>
                    <Text style={styles.subtitle}>Today's Class</Text>
                    <Text style={styles.classText}>Mobile Programming</Text>
                    <Text style={styles.classDetail}>08:00 - 10:00</Text>
                    <Text style={styles.classDetail}>Lab 3</Text>
                    <TouchableOpacity
                        style={[styles.button, isCheckedIn && styles.buttonChecked]}
                        onPress={handleCheckIn}
                        disabled={isCheckedIn}
                    >
                        <Text style={styles.buttonText}>
                            {isCheckedIn ? "CHECKED IN" : "CHECK IN"}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Attendance History */}
                <View style={styles.historySection}>
                    <Text style={styles.subtitle}>Attendance History</Text>

                    {historyData.map((item) => (
                        <View key={item.id} style={styles.historyItem}>
                            <View>
                                <Text style={styles.courseName}>{item.course}</Text>
                                <Text style={styles.courseDate}>{item.date}</Text>
                            </View>
                            <Text
                                style={
                                    item.status === "Present"
                                        ? styles.statusPresent
                                        : styles.statusAbsent
                                }
                            >
                                {item.status}
                            </Text>
                        </View>
                    ))}
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F0F0F0",
    },
    content: {
        padding: 20,
        paddingBottom: 40,
    },

    /* Header */
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#1a1a1a",
    },
    clock: {
        fontSize: 14,
        fontWeight: "600",
    },
    clockRed: {
        color: "#D32F2F",
    },
    clockBlue: {
        color: "#1565C0",
    },

    /* Profile Card */
    card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },
    iconCircle: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: "#EEEEEE",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 14,
    },
    profileInfo: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#1a1a1a",
        marginBottom: 2,
    },
    infoText: {
        fontSize: 13,
        color: "#666",
        marginTop: 1,
    },

    /* Today's Class Card */
    classCard: {
        backgroundColor: "#FFFFFF",
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },
    subtitle: {
        fontSize: 17,
        fontWeight: "bold",
        color: "#1a1a1a",
        marginBottom: 8,
    },
    classText: {
        fontSize: 15,
        color: "#333",
        marginBottom: 2,
    },
    classDetail: {
        fontSize: 13,
        color: "#888",
        marginTop: 1,
    },
    button: {
        marginTop: 14,
        backgroundColor: "#1565C0",
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    buttonChecked: {
        backgroundColor: "#90CAF9",
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 14,
        letterSpacing: 1,
    },

    /* Attendance History */
    historySection: {
        backgroundColor: "#FFFFFF",
        padding: 16,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },
    historyItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#F0F0F0",
    },
    courseName: {
        fontSize: 15,
        fontWeight: "600",
        color: "#333",
    },
    courseDate: {
        fontSize: 12,
        color: "#999",
        marginTop: 2,
    },
    statusPresent: {
        color: "#2E7D32",
        fontWeight: "bold",
        fontSize: 14,
    },
    statusAbsent: {
        color: "#D32F2F",
        fontWeight: "bold",
        fontSize: 14,
    },
});