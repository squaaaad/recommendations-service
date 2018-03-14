#!/usr/bin/env python

from faker import Faker
from random import *
import json

fake = Faker()
type = ['bar', 'nightclub', 'restaurant'];

with open('data-bulk.json', 'w') as f:
    for i in range(1, 10000001):
        restaurant = {
            'name': fake.company(),
            'place_id': str(i),
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
            'location': {
                'lat': 37.774929,
                'long': -122.419416,
            },
            'address': fake.street_address(),
            'website': fake.url(schemes=None),
            'price_level': randint(1, 5),
            'types': type[randint(0, 2)],
            'nearby': [randint(1, 10000000), randint(1, 10000000), randint(1, 10000000), randint(1, 10000000),
                       randint(1, 10000000), randint(1, 10000000)],
        }
        string = json.dumps(restaurant) + ',\n';
        f.write(string)
