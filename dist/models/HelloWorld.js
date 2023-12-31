"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = exports.HelloWorld = void 0;
const sequelize_1 = __importStar(require("sequelize"));
class HelloWorld extends sequelize_1.Model {
}
exports.HelloWorld = HelloWorld;
function start(connection, tableName = "Users") {
    return new Promise((resolve) => {
        HelloWorld.init({
            id: {
                primaryKey: true,
                type: sequelize_1.DataTypes.UUID,
                defaultValue: sequelize_1.DataTypes.UUIDV4,
                unique: true,
            },
            name: {
                type: sequelize_1.DataTypes.STRING,
            },
            age: {
                type: sequelize_1.DataTypes.INTEGER,
            },
            street: {
                type: sequelize_1.DataTypes.STRING,
            },
            neighborhood: {
                type: sequelize_1.DataTypes.STRING,
            },
            city: {
                type: sequelize_1.DataTypes.STRING,
            },
            state: {
                type: sequelize_1.DataTypes.STRING,
            },
            postalCode: {
                type: sequelize_1.DataTypes.STRING,
            },
            numberHouse: {
                type: sequelize_1.DataTypes.INTEGER,
            },
            email: {
                type: sequelize_1.DataTypes.STRING,
            },
            password: {
                type: sequelize_1.DataTypes.STRING,
            },
            timestamp: {
                allowNull: false,
                type: sequelize_1.default.DATE,
                defaultValue: new Date(),
            },
        }, {
            sequelize: connection,
            freezeTableName: true,
            tableName,
            timestamps: false,
        });
        resolve();
    });
}
exports.start = start;
