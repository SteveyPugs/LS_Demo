Functions
---------

#### `check(input,callback)`
Returns data from Live Stream's API if there is a valid account. Account ID must be provided in ``input``.

#### `add(input,callback)`
Creates a new registration with given ```input```. Required fields for ```input``` include: ```livestream_ID```, ```full_name``` and ```dob```. Optional fields for ```input``` include: ```favorite_camera``` and ```favorite_movies```.

On completion, ```callback``` will be called with method signature ```callback(err, newDirector)``` where result will be an object containing sequelize object references to the newly created  ```newDirector``` if ```err``` is null.

#### `update(input,callback)`
Updates registration with given ```input```. Required fields for ```input``` include: ```full_name```. Optional fields for ```input``` include: ```favorite_camera``` and ```favorite_movies```. If no optional fields are supplied then registration will not be updated.

#### `list(callback)`
Returns list of registrations. No ```input``` needed. Returns ```callback(null, output)``` where result will be an object containing the ```output``` list of directors if ```err``` is null