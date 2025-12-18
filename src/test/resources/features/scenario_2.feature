@Scenario_2 @smoke @regression
Feature: User Login

Background: Login to Appian
  Given I launch Chrome browser
  When I navigate to Appian application
  And I login with valid credentials

  Scenario: Successful user login with valid credentials
    Given the user is on the login page
    Then the login page displays the Username field
    And the login page displays the Password field
    And the login page displays the Sign In button
    When the user enters a valid username in the Username field
    And the user enters a valid password in the Password field
    Then the password field is masked
    And the Sign In button is clickable
    When the user clicks the Sign In button
    Then the user is successfully authenticated
    And the user is redirected to the Home Dashboard