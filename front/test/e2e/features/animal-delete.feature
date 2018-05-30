@animal

Feature: Animal delete
  In order to manage system data
  As an administrator
  I want to have ability to delete an animal entity

  Background:
    Given I have opened Main Page
    And I click at Animals menu item

  Scenario: Animal entity can be deleted
    When I click at Animal Details button for "Cat" animal
    And I get Animal Details page
    When I click at Animal Delete button
    Then I should get Animal List w/o "Cat" animal
