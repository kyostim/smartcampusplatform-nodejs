CREATE DATABASE IF NOT EXISTS `SmartCampus`;
USE `SmartCampus`;

CREATE TABLE IF NOT EXISTS `Thing` (
  `UUID` binary(16) NOT NULL DEFAULT unhex(replace(uuid(),'-','')),
  `Name` varchar(255) NOT NULL,
  PRIMARY KEY (`UUID`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8;

CREATE TABLE IF NOT EXISTS `Feature` (
  `UUID` binary(16) NOT NULL DEFAULT unhex(replace(uuid(),'-','')),
  `Name` varchar(255) NOT NULL,
  `Type` varchar(255) NOT NULL,
  `UsageType` varchar(255) NOT NULL,
  PRIMARY KEY (`UUID`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8;

CREATE TABLE IF NOT EXISTS `FeatureValue` (
  `UUID` binary(16) NOT NULL DEFAULT unhex(replace(uuid(),'-','')),
  `ThingUUID` binary(16) NOT NULL,
  `FeatureUUID` binary(16) NOT NULL,
  `Value` varchar(255) NOT NULL,
  `Name` varchar(255),
  PRIMARY KEY (`UUID`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8;

CREATE TABLE IF NOT EXISTS `Hierarchy` (
  `UUID` binary(16) NOT NULL DEFAULT unhex(replace(uuid(),'-','')),
  `ParentUUID` binary(16) NOT NULL,
  `ThingUUID` binary(16),
  `Name` varchar(255),
  PRIMARY KEY (`UUID`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8;

ALTER TABLE Hierarchy ADD CONSTRAINT FK_Hierarchy_Thing FOREIGN KEY(ThingUUID) REFERENCES Thing(UUID);
ALTER TABLE FeatureValue ADD CONSTRAINT FK_FeatureValue_Thing FOREIGN KEY(ThingUUID) REFERENCES Thing(UUID);
ALTER TABLE FeatureValue ADD CONSTRAINT FK_FeatureValue_Feature FOREIGN KEY(FeatureUUID) REFERENCES Feature(UUID);

