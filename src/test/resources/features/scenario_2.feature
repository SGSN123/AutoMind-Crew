@Scenario_2 @smoke @regression
Feature: User Login

Background: Login to Appian
  Given I launch Chrome browser
  When I navigate to Appian application
  And I login with valid credentials

  Scenario: Successful user login and redirection to Home Dashboard
    Given the user is on the login page
    Then the login page must display the Username field
    And the login page must display the Password field
    And the login page must display the Sign In button
    When the user enters a valid username in the Username field
    And the user enters a valid password in the Password field
    Then the password field must be masked
    When the user clicks the Sign In button
    Then the user must be successfully authenticated
    And the user must be redirected to the Home Dashboard