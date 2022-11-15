CREATE DATABASE LPR_FR;

CREATE TABLE LPR_results (
    id char(36) not null primary key,
    loc_name varchar(100),
    plate_top_x varchar(100),
    plate_top_y varchar(100),
    plate_bottom_x varchar(100),
    plate_bottom_y varchar(100),
    plate varchar(100),
    region varchar(100),
    score varchar(100),
    dscore varchar(100),
    vehicle_type varchar(100),
    vehicle_top_x varchar(100),
    vehicle_top_y varchar(100),
    vehicle_bottom_x varchar(100),
    vehicle_bottom_y varchar(100),
    img varchar(200),
   time varchar(100),
   plate_img varchar(200),
   device_id varchar(100),
   tracking_id varchar(100),
   vehicle_id varchar(100)
);

grant all privileges on LPR_results.* to goback@'%';

flush privileges;

INSERT INTO LPR_results VALUES
(uuid(),'J_cma','316', '180', '200', '149', '0504727', 'cz', '0.795', '0.942', 'Sedan', '403', '244', '2', '2', '/images/car15.jpg', '2020.01.23 PM 04:45'),
(uuid(),'K_cam','282', '575', '143', '481', 'nhk552', 'gb', '0.904', '0.99', 'SUV', '908', '653', '67', '113', '/images/car14.jpg', '2020-10-12T16:17:27.574008Z'),
(uuid(),'c_cam','702', '579', '563', '530', '765410', 'kr', '0.913', '0.408', 'SUV', '815', '358', '59', '214', '/images/car13.jpg', '2019-08-31T14:22:06.983Z'),
(uuid(),'U_cam','875', '693', '236', '195', '830265', 'kr', '0.795', '0.942', 'Sedan', '863', '244', '2', '2', '/images/car12.jpg', '2020-06-18T17:29:27.574008Z'),
(uuid(),'H_cam','695', '180', '200', '149', '0504727', 'gb', '0.795', '0.942', 'Truck', '403', '244', '2', '2', '/images/car11.jpg', '2021-04-08T06:07:07.574088Z');


CREATE TABLE PR_results (
    id char(36) not null primary key,
    img varchar(200),
    time varchar(100),
    crop_img varchar(200),
    device_id varchar(100),
    person_id varchar(100),
    age varchar(100),
    body varchar(100),
    gender varchar(100), 
    head varchar(100),
    holing_items varchar(100),
    lower_colors varchar(100),
    upper_colors varchar(100),
    shoes_colors varchar(100)
);

CREATE TABLE user (
    id varchar(100),
    pwd varchar(100),
    create_time varchar(100)
);

CREATE TABLE LPR_results2 (
    id char(36) not null primary key,
    img varchar(200),
    plate_img varchar(200),
    color varchar(100),
    direction varchar(100),
    type varchar(100),
    box_x varchar(100),
    box_y varchar(100),
    box_w varchar(100),
    box_h varchar(100),
    device_id varchar(100),
    event_time varchar(100),
    region varchar(100),
    tracking_id varchar(100)
);