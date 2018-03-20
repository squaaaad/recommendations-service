
CREATE TABLE restaurants
(
  _id int NOT NULL,
  name text,
  google_rating int,
  zagat_food_rating int,
  review_count int,
  photo_one text,
  photo_two text,
  photo_three text,
  short_description text,
  neighborhood text,
  price_level int,
  rest_type text,
  nearby_one int,
  nearby_two int,
  nearby_three int,
  nearby_four int,
  nearby_five int,
  nearby_six int,
  PRIMARY KEY (_id)
);