@Scenario_2 @smoke @regression
Feature: User Login

Background: Login to Appian
  Given I launch Chrome browser
  When I navigate to Appian application
  And I login with valid credentials

  Scenario: Successful login with valid credentials
    Given the user is on the login page
    Then the Username field is displayed
    And the Password field is displayed
    And the Password field input is masked
    And the Sign In button is displayed
    When the user enters a username in the Username field
    And the user enters a password in the Password field
    And the user clicks the Sign In button
    Then the user is successfully authenticated
    And the user is redirected to the Home Dashboard