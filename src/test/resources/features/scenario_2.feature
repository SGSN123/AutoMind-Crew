@Scenario_2 @smoke @regression
Feature: User Login

Background: Login to Appian
  Given I launch Chrome browser
  When I navigate to Appian application
  And I login with valid credentials

  Scenario: User can sign in successfully with valid credentials
    Given the user is on the login page
    Then the Username field is displayed
    And the Password field is displayed
    And the Sign In button is displayed
    When the user enters "validUser" into the Username field
    And the user enters "validPassword" into the Password field
    Then the Password field must mask the entered text
    When the user clicks the Sign In button
    Then the user is successfully authenticated
    And the user is redirected to the Home Dashboard