@animal

Feature: Animal create
  In order to manage system data
  As an administrator
  I want to have ability to create a new animal entity

  Background:
    Given I have opened Main Page
    And I click at Animals menu item

  Scenario: Animal entity can be created w/o features
    When I click at New Animal button
    And I get Create Animal page
    And I put "Barnacle" value to Name field
    And I click at Save button
    Then I should get created "Barnacle" animal entity

  Scenario: Animal entity can be created w/ features
    When I click at New Animal button
    And I get Create Animal page
    And I put "Fish" value to Name field
    And I search feature with "ta" value
    And I get "tail" feature for appropriation
    And I add "tail" feature
    And I see "tail" feature as a defined one
    And I click at Save button
    Then I should get created "Fish" animal entity

  Scenario: Defined features can be changed
    When I click at New Animal button
    And I get Create Animal page
    And I search feature with "ta" value
    And I get "tail" feature for appropriation
    And I add "tail" feature
    And I see "tail" feature as a defined one
    And I remove "tail" feature from defined features
    Then I should get defined features w/o "tail" feature
    And I get "tail" feature for appropriation
