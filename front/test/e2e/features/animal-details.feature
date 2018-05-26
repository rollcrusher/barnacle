@animal

Feature: Animal details
  In order to manage system data
  As an administrator
  I want to have ability to observe animal entity details

  Background:
    Given I have opened Main Page
    And I click at Animals menu item

  Scenario: Animal list contains required records
    When I click at Animal Details button for "Cat" animal
    Then I should get Animal Details page
    And The animal should have "Cat" name
    And The animal should have features
      | Feature |
      | paw     |
      | meows   |
