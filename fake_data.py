#!/usr/bin/env python

from faker import Faker
from random import *
import json

fake = Faker()
type = ['bar', 'nightclub', 'restaurant', 'cafe'];

with open('test.json', 'w', buffering=20*(1024**2)) as f:
    for i in range(1, 1000001):
        restaurant = {
            '_id': i,
            'name': fake.company(),
            'google_rating': randint(1, 5),
            'zagat_food_rating': randint(1, 5),
            'review_count': randint(1, 1000),
            'photos': [
                'https://loremflickr.com/320/240/food',
                'https://loremflickr.com/320/240/food',
                'https://loremflickr.com/320/240/food'
            ],
            'short_description': fake.catch_phrase(),
            'neighorhood': fake.city(),
            'price_level': randint(1, 5),
            'types': type[randint(0, 3)],
            'nearby': [randint(1, 10000000), randint(1, 10000000), randint(1, 10000000), randint(1, 10000000),
                       randint(1, 10000000), randint(1, 10000000)],
        }
        string = json.dumps(restaurant) + ',\n';
        f.write(string)
