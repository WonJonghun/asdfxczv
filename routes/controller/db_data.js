var db = require('../controller/dbconnection');

var maria_pool = db.maria;

exports.get_center = function (req, res) {
    var sql = "SELECT * FROM centerxy;"

    maria_pool.query(sql, function (error, results) {

        if (!error) {
            console.log(results);
            res.send(results);
        } else {
            console.log("query error : ", error);
            res.send(error);
        }
    });
};

exports.update_center = function (req, res) {
    var sql = "UPDATE centerxy SET latitude = "+req.body.lat+", longitude = "+req.body.long+";"
    console.log(sql)

    maria_pool.query(sql, function (error, results) {

        if (!error) {
            console.log(results);
            res.send(results);
        } else {
            console.log("query error : ", error);
            res.send(error);
        }
    });
};

exports.get_buildingList = function (req, res) {

    var sql = "SELECT * FROM buildings;"

    maria_pool.query(sql, function (error, results) {

        if (!error) {
            console.log(results);
            res.send(results);
        } else {
            console.log("query error : ", error);
            res.send(error);
        }
    });
};

exports.get_panels = function (req, res) {

    var sql = "SELECT * FROM panels WHERE building_id =" + req.body.id + ";"

    maria_pool.query(sql, function (error, results) {

        if (!error) {
            console.log(results);
            res.send(results);
        } else {
            console.log("query error : ", error);
            res.send(error);
        }
    });
};

exports.get_equipmentsInPanel = function (req, res) {

    var sql = "SELECT a.id, b.name, b.icon_path FROM panels_equipments a, equipments b WHERE a.panel_id = " + req.body.id + " AND a.equipment_id = b.id";

    maria_pool.query(sql, function (error, results) {

        if (!error) {
            console.log(results);
            res.send(results);
        } else {
            console.log("query error : ", error);
            res.send(error);
        }
    });
};

exports.check_buildingName = function (req, res) {

    var sql = "SELECT * FROM buildings WHERE name = '" + req.body.name + "'";

    maria_pool.query(sql, function (error, results) {

        if (!error) {
            console.log(results);
            res.send(results);
        } else {
            console.log("query error : ", error);
            res.send(error);
        }
    });
};
exports.insert_building = function (req, res) {

    var sql = "INSERT INTO buildings (name, organization, latitude, longitude) value('" + req.body.name + "','" + req.body.org + "'," + req.body.lat + "," + req.body.long + ")"
    console.log(sql)

    maria_pool.query(sql, function (error, results) {
        if (!error) {
            console.log(results);
            res.send(results);
        } else {
            console.log("query error : ", error);
            res.send(error);
        }
    });
};

exports.update_building = function (req, res) {
    var sql = "UPDATE buildings SET name = '"+req.body.name+"', organization = '"+req.body.org+"', latitude = "+req.body.lat+", longitude = "+req.body.long+" WHERE id = "+req.body.id
    console.log(sql)

    maria_pool.query(sql, function (error, results) {
        if (!error) {
            console.log(results);
            res.send(results);
        } else {
            console.log("query error : ", error);
            res.send(error);
        }
    });
};

exports.delete_building = function (req, res) {

    var sql = "DELETE FROM buildings WHERE id = "+req.body.id
    console.log(sql)

    maria_pool.query(sql, function (error, results) {
        if (!error) {
            console.log(results);
            res.send(results);
        } else {
            console.log("query error : ", error);
            res.send(error);
        }
    });
};

exports.get_equipments = function (req, res) {

    var sql = "SELECT * FROM equipments"

    maria_pool.query(sql, function (error, results) {
        if (!error) {
            console.log(results);
            res.send(results);
        } else {
            console.log("query error : ", error);
            res.send(error);
        }
    });
};

exports.panels_equip_db_call = function (req, res) {

    var sql = "SELECT x.id, y.name, z.id as pe_id, z.equipment_id FROM panels x, equipments y, panels_equipments z WHERE x.id='"+req.body.panel_id+"' and x.id=z.panel_id and y.id=z.equipment_id;"
        
    maria_pool.query(sql, function(error, results){
  
      if(!error){
        console.log(results);
        res.send(results);
      } else {
          console.log("query error : ",error);
          res.send(error);
      }
    });
};

exports.insert_panel = function (req, res) {
    var sql = "insert into panels(name, building_id) value ("
    sql += "'"+req.body.banname+"',"
    sql += req.body.building_id+");"
    
  
    maria_pool.query(sql, function(error, results){
  
      if(!error){
        console.log(results);
        res.send(results);
      } else {
          console.log("query error : ",error);
          res.send(error);
      }
    });
};

exports.get_panel_id = function (req, res) {

    var sql = "SELECT id FROM panels WHERE building_id='" + req.body.building_id + "' and  name='"+req.body.banname+"';"
  
    maria_pool.query(sql, function (error, results) {
  
        if (!error) {
            console.log(results);
            res.send(results);
        } else {
            console.log("query error : ", error);
            res.send(error);
        }
    });
  };

  exports.update_panel_name = function (req, res) {

    var sql = "UPDATE panels SET name='"+req.body.panel_name+"' WHERE id='" + req.body.id + "';"
  
    maria_pool.query(sql, function (error, results) {
  
        if (!error) {
            console.log(results);
            res.send(results);
        } else {
            console.log("query error : ", error);
            res.send(error);
        }
    });
  };

  exports.insert_new_equip = function (req, res) {

    var sql = "insert into panels_equipments(panel_id, equipment_id) value ("
    sql += "'" + req.body.panel_id + "',"
    sql += req.body.equipment_id + ");"
  
    maria_pool.query(sql, function (error, results) {
  
        if (!error) {
            console.log(results);
            res.send(results);
        } else {
            console.log("query error : ", error);
            res.send(error);
        }
    });
  };

  exports.delete_equipment = function (req, res) {

    var sql = "DELETE FROM panels_equipments WHERE id = "+req.body.equipment_id;

    maria_pool.query(sql, function (error, results) {
  
        if (!error) {
            console.log(results);
            res.send(results);
        } else {
            console.log("query error : ", error);
            res.send(error);
        }
    });
  };

  exports.delete_panel = function (req, res) {

    var sql = "DELETE FROM panels WHERE id = "+req.body.panel_id

    maria_pool.query(sql, function (error, results) {
        if (!error) {
            console.log(results);
            res.send(results);
        } else {
            console.log("query error : ", error);
            res.send(error);
        }
    });
};

exports.get_camera = function (req, res) {

  var sql = "SELECT * FROM cameras"

  maria_pool.query(sql, function (error, results) {
      if (!error) {
          console.log(results);
          res.send(results);
      } else {
          console.log("query error : ", error);
          res.send(error);
      }
  });
};

exports.get_buildingAndPanelAndEquip = function (req, res) {

    var sql = "SELECT p.name AS panel_name, b.name AS building_name FROM panels p, buildings b WHERE p.id = "+req.body.panel_id+" and p.building_id = b.id;"
    var sql2 = "SELECT pe.id as equipment_id, e.name as equipment_name, ce.* FROM panels p, panels_equipments pe, equipments e, camera_equipments ce WHERE p.id = "+req.body.panel_id+" and p.id = pe.panel_id and pe.equipment_id = e.id and pe.id = ce.panel_equipment_id ;"
    var sql3 = "SELECT pe.*, pe.id AS equipment_id, e.* FROM panels_equipments pe, equipments e WHERE pe.panel_id = "+req.body.panel_id+" and pe.equipment_id = e.id;"

    maria_pool.query(sql + sql2 +sql3, function (error, results) {
        if (!error) {
            console.log(results);
            res.send(results);
        } else {
            console.log("query error : ", error);
            res.send(error);
        }
    });
  };

  exports.update_coord = function (req, res) {

    var sql = "UPDATE camera_equipments SET x1 = "+req.body.x1+", y1 = "+req.body.y1+", x2 = "+req.body.x2+", y2 = "+req.body.y2+" WHERE panel_equipment_id = "+req.body.equip_id
    console.log(sql)
    maria_pool.query(sql, function (error, results) {
        if (!error) {
            console.log(results);
            res.send(results);
        } else {
            console.log("query error : ", error);
            res.send(error);
        }
    });
  };

  exports.insert_coord = function (req, res) {

    var sql = "INSERT INTO camera_equipments(camera_id, panel_equipment_id, x1, y1, x2, y2) VALUE("+req.body.cam_id+","+req.body.equip_id+","+req.body.x1+","+req.body.y1+","+req.body.x2+","+req.body.y2+")"
    console.log(sql)

    maria_pool.query(sql, function (error, results) {
        if (!error) {
            console.log(results);
            res.send(results);
        } else {
            console.log("query error : ", error);
            res.send(error);
        }
    });
  };

  exports.delete_coord = function (req, res) {

    var sql = "DELETE FROM camera_equipments WHERE panel_equipment_id = "+req.body.equipment_id

    maria_pool.query(sql, function (error, results) {
        if (!error) {
            console.log(results);
            res.send(results);
        } else {
            console.log("query error : ", error);
            res.send(error);
        }
    });
  };

  exports.get_cameraImage = function (req, res) {

    var sql = "SELECT root_path FROM cameras WHERE panel_id = "+req.body.panel_id

    maria_pool.query(sql, function (error, results) {
        if (!error) {
            console.log(results);
            res.send(results);
        } else {
            console.log("query error : ", error);
            res.send(error);
        }
    });
  };

  exports.get_equipList = function (req, res) {

    var sql = "SELECT x.id, e.name,e.icon_path ,e.allowed_temp FROM panels_equipments x, panels y, equipments e  WHERE y.building_id ="+req.body.building_id+" AND panel_id = "+req.body.panel_id+" AND y.id = x.panel_id AND e.id= x.equipment_id;"

    maria_pool.query(sql, function (error, results) {
        if (!error) {
            console.log(results);
            res.send(results);
        } else {
            console.log("query error : ", error);
            res.send(error);
        }
    });
  };

  exports.get_tempAndCoord = function (req, res) {

    var sql = "SELECT max(etbd.max_temp), min(etbd.min_temp), avg(etbd.avg_temp)  FROM camera_equipments ce, equipment_temperatures_by_date etbd WHERE ce.panel_equipment_id = "+req.body.equip_id+" AND ce.id = etbd.camera_equipment_id;"
    var sql2 = "SELECT ce.x1, ce.y1, ce.x2, ce.y2  FROM camera_equipments ce WHERE ce.panel_equipment_id = "+req.body.equip_id+";"

    maria_pool.query(sql + sql2, function (error, results) {
        if (!error) {
            console.log(results);
            res.send(results);
        } else {
            console.log("query error : ", error);
            res.send(error);
        }
    });
  };

  exports.get_tempAndCoord_dashboard = function (req, res) { // 1006수정 - 날짜조건

    var sql = "SELECT max(etbd.max_temp), min(etbd.min_temp), avg(etbd.avg_temp)  FROM camera_equipments ce, equipment_temperatures_by_date etbd WHERE ce.panel_equipment_id = "+req.body.equip_id+" AND ce.id = etbd.camera_equipment_id  AND date_format(etbd.date_time, '%Y-%m') = '"+req.body.new_date+"';"
    var sql2 = "SELECT ce.x1, ce.y1, ce.x2, ce.y2  FROM camera_equipments ce WHERE ce.panel_equipment_id = "+req.body.equip_id+";"
    var sql3 = "SELECT max(etbd.max_temp), min(etbd.min_temp), avg(etbd.avg_temp)  FROM camera_equipments ce, equipment_temperatures_by_date etbd WHERE ce.panel_equipment_id = "+req.body.equip_id+" AND ce.id = etbd.camera_equipment_id  AND date_format(etbd.date_time, '%Y-%m') = '"+req.body.old_date+"';"

    maria_pool.query(sql + sql2 + sql3, function (error, results) {
        if (!error) {
            console.log(results);
            res.send(results);
        } else {
            console.log("query error : ", error);
            res.send(error);
        }
    });
  };

  exports.get_tempAndCoordByMonth = function (req, res) {

    var sql = "SELECT max(etbd.max_temp), min(etbd.min_temp), avg(etbd.avg_temp)  FROM camera_equipments ce, equipment_temperatures_by_date etbd WHERE ce.panel_equipment_id = "+req.body.equip_id+" AND ce.id = etbd.camera_equipment_id AND MONTH(etbd.date_time) = "+req.body.month+";"
    var sql2 = "SELECT ce.x1, ce.y1, ce.x2, ce.y2  FROM camera_equipments ce WHERE ce.panel_equipment_id = "+req.body.equip_id+";"

    maria_pool.query(sql + sql2, function (error, results) {
        if (!error) {
            console.log(results);
            res.send(results);
        } else {
            console.log("query error : ", error);
            res.send(error);
        }
    });
  };

  exports.get_tempData = function (req, res) {

    var sql = "SELECT etbd.date_time , ce.panel_equipment_id  ,etbd.max_temp, ce.x1, ce.y1, ce.x2, ce.y2 "
        sql += "FROM equipment_temperatures_by_date etbd ,camera_equipments ce "
        sql += "WHERE ce.panel_equipment_id = "+req.body.equip_id+" AND ce.id = etbd.camera_equipment_id AND etbd.date_time "
        sql += "BETWEEN DATE_ADD(NOW(),INTERVAL -1 MONTH ) AND NOW();"
    console.log(sql)

    maria_pool.query(sql, function (error, results) {
        if (!error) {
            console.log(results);
            res.send(results);
        } else {
            console.log("query error : ", error);
            res.send(error);
        }
    });
  };

  exports.get_tempData_dashboard = function (req, res) { // 1006 수정 날짜 조건 추가

    var sql1 = "SELECT etbd.date_time , ce.panel_equipment_id  ,etbd.max_temp, ce.x1, ce.y1, ce.x2, ce.y2 "
        sql1 += "FROM equipment_temperatures_by_date etbd ,camera_equipments ce "
        sql1 += "WHERE ce.panel_equipment_id = "+req.body.equip_id+" AND ce.id = etbd.camera_equipment_id AND date_format(etbd.date_time, '%Y-%m') = '"+req.body.new_date+"';"

    var sql2 = "SELECT etbd.date_time , ce.panel_equipment_id  ,etbd.max_temp, ce.x1, ce.y1, ce.x2, ce.y2 "
        sql2 += "FROM equipment_temperatures_by_date etbd ,camera_equipments ce "
        sql2 += "WHERE ce.panel_equipment_id = "+req.body.equip_id+" AND ce.id = etbd.camera_equipment_id AND date_format(etbd.date_time, '%Y-%m') = '"+req.body.old_date+"';"
    // console.log(sql)

    maria_pool.query(sql1 + sql2, function (error, results) {
        if (!error) {
            console.log(results);
            res.send(results);
        } else {
            console.log("query error : ", error);
            res.send(error);
        }
    });
  };

   //----------------0930 chart data add

   exports.get_chart_data = function (req, res) {

    var flag = req.body.panel_flag;

    var sql = "select x.id, e.name,e.icon_path ,e.allowed_temp  from panels_equipments x, panels y, equipments e  where y.building_id ="+req.body.id+" and y.id = x.panel_id and e.id= x.equipment_id;"
    

    maria_pool.query(sql , function (error, results) {
        
        if (!error) {
            console.log(results);
            res.send(results);
        } else {
            console.log("query error : ", error);
            res.send(error);
        }
    });
  };

  exports.get_chart_data_val = function (req, res) {

    // var sql = "select * from equipment_temperatures_by_date etbd ,camera_equipments ce where ce.panel_equipment_id = "+req.body.id+" and ce.id = etbd.camera_equipment_id ;"
    var sql = "select etbd.date_time , ce.panel_equipment_id  ,etbd.max_temp from equipment_temperatures_by_date etbd ,camera_equipments ce where ce.panel_equipment_id = "+req.body.id+" and ce.id = etbd.camera_equipment_id and etbd.date_time BETWEEN DATE_ADD(NOW(),INTERVAL -1 MONTH ) AND NOW() ORDER BY date_time;"

    maria_pool.query(sql , function (error, results) {
        
        if (!error) {
            console.log(results);
            res.send(results);
        } else {
            console.log("query error : ", error);
            res.send(error);
        }
    });
  };

  //---------------------0930

  exports.get_tempCount = function (req, res) {

    var sql = "SELECT COUNT(etbd.max_temp) "
        sql += "FROM equipment_temperatures_by_date etbd ,camera_equipments ce "
        sql += "WHERE ce.panel_equipment_id = "+req.body.equip_id+" AND ce.id = etbd.camera_equipment_id AND etbd.date_time "
        sql += "BETWEEN DATE_ADD(NOW(),INTERVAL -1 MONTH ) AND NOW() and etbd.max_temp > "+req.body.allowed_temp+";"

    maria_pool.query(sql , function (error, results) {
        
        if (!error) {
            console.log(results);
            res.send(results);
        } else {
            console.log("query error : ", error);
            res.send(error);
        }
    });
  };

  exports.get_date = function (req, res) {

    var sql = "SELECT DATE_FORMAT(date_time ,'%Y-%m-%d') FROM mobile_equipment_temperatures WHERE building_id = "+req.body.building_id+" AND panel_id = "+req.body.panel_id+" GROUP BY DATE_FORMAT(date_time ,'%Y-%m-%d') ORDER BY date_time DESC"

    maria_pool.query(sql , function (error, results) {
        
        if (!error) {
            console.log(results);
            res.send(results);
        } else {
            console.log("query error : ", error);
            res.send(error);
        }
    });
  };

  exports.get_mobileData = function (req, res) {

    // var sql = "SELECT x.*, e.name FROM mobile_equipment_temperatures x, equipments e WHERE x.building_id = "+req.body.building_id+" AND x.panel_id = "+req.body.panel_id+" and x.equipment_id = e.id and DATE_FORMAT(x.date_time , '%Y-%m') = '"+req.body.old_date+"';",
    //     sql2 = "SELECT x.*, e.name FROM mobile_equipment_temperatures x, equipments e WHERE x.building_id = "+req.body.building_id+" AND x.panel_id = "+req.body.panel_id+" and x.equipment_id = e.id and DATE_FORMAT(x.date_time , '%Y-%m') = '"+req.body.new_date+"';";
        var sql = "SELECT date_format(x.date_time, '%Y-%m-%d') AS date, x.*, e.name, p.name AS panel_name, e.icon_path, e.allowed_temp FROM mobile_equipment_temperatures x, equipments e, panels p WHERE x.building_id = "+req.body.building_id+" AND x.panel_id = "+req.body.panel_id+" AND x.equipment_id = e.id AND p.id = x.panel_id AND DATE_FORMAT(x.date_time , '%Y-%m') = '"+req.body.old_date+"';",
            sql2 = "SELECT date_format(x.date_time, '%Y-%m-%d') AS date, x.*, e.name, p.name AS panel_name, e.icon_path, e.allowed_temp FROM mobile_equipment_temperatures x, equipments e, panels p WHERE x.building_id = "+req.body.building_id+" AND x.panel_id = "+req.body.panel_id+" AND x.equipment_id = e.id AND p.id = x.panel_id AND DATE_FORMAT(x.date_time , '%Y-%m') = '"+req.body.new_date+"';";
        console.log(sql)
        console.log(sql2)


    maria_pool.query(sql + sql2 , function (error, results) {
        
        if (!error) {
            console.log(results);
            res.send(results);
        } else {
            console.log("query error : ", error);
            res.send(error);
        }
    });
  };


  exports.get_year = function (req, res) {

    var sql = "SELECT date_format(date_time, '%Y') AS year FROM equipment_temperatures_by_date  WHERE building_id = "+req.body.building_id+" GROUP BY date_format(date_time, '%Y');"
    
    maria_pool.query(sql, function (error, results) {
        
        if (!error) {
            console.log(results);
            res.send(results);
        } else {
            console.log("query error : ", error);
            res.send(error);
        }
    });
  };

  exports.get_month = function (req, res) {

    var sql = "SELECT date_format(date_time, '%m') AS year FROM equipment_temperatures_by_date  WHERE building_id = "+req.body.building_id+" GROUP BY date_format(date_time, '%m');"
    
    maria_pool.query(sql, function (error, results) {
        
        if (!error) {
            console.log(results);
            res.send(results);
        } else {
            console.log("query error : ", error);
            res.send(error);
        }
    });
  };

  exports.get_chart_data_val_by_month = function (req, res) {

    // var sql = "select * from equipment_temperatures_by_date etbd ,camera_equipments ce where ce.panel_equipment_id = "+req.body.id+" and ce.id = etbd.camera_equipment_id ;"
    
    var sql = "select etbd.date_time , ce.panel_equipment_id  ,etbd.max_temp from equipment_temperatures_by_date etbd ,camera_equipments ce where ce.panel_equipment_id = "+req.body.id+" and ce.id = etbd.camera_equipment_id and date_format(etbd.date_time, '%Y-%m') = '"+req.body.date+"';"
console.log(sql)
    maria_pool.query(sql , function (error, results) {
        
        if (!error) {
            console.log(results);
            res.send(results);
        } else {
            console.log("query error : ", error);
            res.send(error);
        }
    });
  };

  exports.get_panels_and_img_by_month = function (req, res) {

    var sql = "SELECT etbd.panel_id, p2.name, c.root_path FROM equipment_temperatures_by_date etbd, cameras c, panels p2 WHERE etbd.building_id =" + req.body.id + " AND etbd.panel_id = c.panel_id AND etbd.panel_id = p2.id AND date_format(etbd.date_time, '%Y-%m') = '"+req.body.date+"' GROUP BY panel_id;"
    maria_pool.query(sql, function (error, results) {

        if (!error) {
            console.log(results);
            res.send(results);
        } else {
            console.log("query error : ", error);
            res.send(error);
        }
    });
};

exports.get_equipList_and_coord_by_month = function (req, res) {

    var sql = "SELECT etbd.camera_equipment_id, ce.*, pe.id, e.name, e.icon_path, e.allowed_temp, max(etbd.max_temp), min(etbd.min_temp), avg(etbd.avg_temp) "
        sql += "FROM equipment_temperatures_by_date etbd, camera_equipments ce, panels_equipments pe, equipments e "
        sql += "WHERE etbd.building_id = "+req.body.building_id+" and etbd.panel_id = "+req.body.panel_id+" and etbd.camera_equipment_id=ce.id "
        sql += "AND ce.panel_equipment_id=pe.id AND pe.equipment_id=e.id and date_format(etbd.date_time, '%Y-%m') = '"+req.body.date+"' group by ce.panel_equipment_id ;"
    console.log(sql)
    maria_pool.query(sql, function (error, results) {

        if (!error) {
            console.log(results);
            res.send(results);
        } else {
            console.log("query error : ", error);
            res.send(error);
        }
    });
};

exports.get_camera_by_id = function (req, res) {

    var sql = "SELECT * FROM cameras WHERE panel_id = "+req.body.id;
  
    maria_pool.query(sql, function (error, results) {
        if (!error) {
            console.log(results);
            res.send(results);
        } else {
            console.log("query error : ", error);
            res.send(error);
        }
    });
  };

  exports.get_cam_all_info = function (req, res) {

    var sql = "select c.name as cam_name, c.id as cam_id, p.name as p_name, p.id as p_id, b.name as b_name, b.id as b_id from cameras c, panels p, buildings b where c.panel_id = p.id and p.building_id = b.id ";
  
    maria_pool.query(sql, function (error, results) {
        if (!error) {
            console.log(results);
            res.send(results);
        } else {
            console.log("query error : ", error);
            res.send(error);
        }
    });
  };

  exports.get_all_panels = function (req, res) {

    var sql = "SELECT * FROM panels"

    maria_pool.query(sql, function (error, results) {

        if (!error) {
            console.log(results);
            res.send(results);
        } else {
            console.log("query error : ", error);
            res.send(error);
        }
    });
};

// exports.get_check_panels_by_month = function (req, res) {

//     var sql = "SELECT etbd.panel_id, p2.name, c.root_path FROM equipment_temperatures_by_date etbd, cameras c, panels p2 WHERE etbd.building_id =" + req.body.id + " AND etbd.panel_id = c.panel_id AND etbd.panel_id = p2.id AND date_format(etbd.date_time, '%Y-%m') = '"+req.body.date+"' GROUP BY panel_id;"
//     maria_pool.query(sql, function (error, results) {

//         if (!error) {
//             console.log(results);
//             res.send(results);
//         } else {
//             console.log("query error : ", error);
//             res.send(error);
//         }
//     });
// };