module.exports = function(sequelize, DataTypes) {
    var Director = sequelize.define("Directors", {
        full_name: {
            type: DataTypes.STRING(255)
        },
        dob: {
            type: DataTypes.DATE
        },
        favorite_camera: {
            type: DataTypes.STRING(255)
        },
        favorite_movies: {
            type: DataTypes.STRING(255)
        },
        livestream_ID: {
            type: DataTypes.INTEGER
        },
    }, {
        freezeTableName: true
    });
    return Director;
};

