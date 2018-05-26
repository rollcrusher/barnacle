@animal

Feature: Animal list
  In order to manage system data
  As an administrator
  I want to have ability to get animal entity list

  Background:
    Given I have opened Main Page

  Scenario: Animal list contains required records
    When I click at Animals menu item
    Then I should get Animal List with names
      | Animal name |
      | Dog         |
      | Cat         |
