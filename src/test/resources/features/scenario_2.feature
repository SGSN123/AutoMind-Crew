@Scenario_2 @smoke @regression
Feature: User Login

Background: Login to Appian
  Given I launch Chrome browser
  When I navigate to Appian application
  And I login with valid credentials

  Background:
    Given the user navigates to the login page

  Scenario: Successful login with valid credentials
    Then the login page must display the "Username" field
    And the login page must display the "Password" field
    And the login page must display the "Sign In" button
    When the user enters a username in the "Username" field
    And the user enters a password in the "Password" field
    Then the password field must be masked
    And the "Sign In" button must be clickable
    When the user clicks the "Sign In" button
    Then the user should be authenticated successfully
    And the user should be redirected to the Home Dashboard