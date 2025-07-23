<?php
function get_name($conn,$id){
    $stmt = $conn->prepare("SELECT * FROM users_profile WHERE id = :user_id LIMIT 1");
    $stmt->bindParam(':user_id', $id);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    return $user;
}


function get_food($conn,$id,$kins){
    $sql = "SELECT 
                mf.ten_thuc_pham,
                mf.khoi_luong AS khoi_luong_thuc_pham,
                mf.calo,
                mf.protein,
                mf.carb,
                mf.fat,
                me.khoi_luong AS khoi_luong_su_dung
            FROM 
                my_food mf
            JOIN 
                my_eyo me ON mf.food_id = me.food_id
            WHERE 
                me.kind = :kind
                AND me.id = :user_id";

    try {
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':kind', $kind, PDO::PARAM_STR);
        $stmt->bindParam(':user_id', $id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        // Xử lý lỗi (ghi log, thông báo, etc.)
        error_log("Database error: " . $e->getMessage());
        return false;
    }
}

?>