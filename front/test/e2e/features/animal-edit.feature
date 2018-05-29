@animal

Feature: Animal edit
  In order to manage system data
  As an administrator
  I want to have ability to create a new animal entity

  Background:
    Given I have opened Main Page
    And I click at Animals menu item

  Scenario: Animal features cab be edited
    When I click at Animal Details button for "Cat" animal
    And I get Animal Details page
    And I click at Edit Animal button
    And I get Animal Edit page
    And I put "Reed Cat" value to Name field
    And I search feature with "ta" value
    And I get "tail" feature for appropriation
    And I add "tail" feature
    And I see "tail" feature as a defined one
    And I click at Save button
    Then I should get Animal Details page
    And The animal should have "Reed Cat" name
    And The animal should have features
      | Feature |
      | paw     |
      | meows   |
      | tail    |
