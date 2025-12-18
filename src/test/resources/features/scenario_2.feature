@Scenario_2 @smoke @regression
Feature: User Login

Background: Login to Appian
  Given I launch Chrome browser
  When I navigate to Appian application
  And I login with valid credentials

  Scenario: User can log in successfully with valid credentials
    Given the user is on the login page in Chrome
    Then the Username field is displayed
    And the Password field is displayed
    And the Password field is masked
    And the Sign In button is displayed
    When the user enters a username in the Username field
    And the user enters a password in the Password field
    Then the Sign In button is clickable
    When the user clicks the Sign In button
    Then the user is authenticated successfully
    And the user is redirected to the Home Dashboard