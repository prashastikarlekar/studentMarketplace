<?php
// Include your database connection code

require_once '../DatabaseConnection.php';

if ($_SERVER["REQUEST_METHOD"] == "GET") {

        $conn = DatabaseConnection::getConnection();

        // Modify the SQL statement to retrieve enrolled courses and instructor name
        $sql= "SELECT u.*, CONCAT(u.first_name, ' ', u.last_name) AS full_name, r.rating
        FROM user u LEFT JOIN rating r ON u.id = r.user_id
        ";
        
        $stmt = $conn->prepare($sql);
        // $stmt->bind_param("i", $user_id);  // "i" represents an integer

        // Execute the statement
        if ($stmt->execute()) {
            // Fetch the results
            $result = $stmt->get_result();
            $users = $result->fetch_all(MYSQLI_ASSOC);
            echo json_encode(["success" => true, "users" => $users]);
        } else {
            echo json_encode(["success" => false, "message" => "Failed to retrieve users. Please try again later."]);
        }

        // Close the statement and the database connection
        $stmt->close();
        $conn->close();
    // }
}
?>


