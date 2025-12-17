@Scenario_2 @smoke @regression
Feature: Login Functionality

Background: Login to Appian
  Given I launch Chrome browser
  When I navigate to Appian application
  And I login with valid credentials

  Scenario: User can successfully sign in with valid credentials
    Given the user navigates to the login page
    Then the login page displays a Username field
    And the login page displays a Password field
    And the login page displays a Sign In button
    When the user enters a valid username in the Username field
    And the user enters a valid password in the Password field
    Then the Password field masks the entered password
    And the Sign In button is clickable
    When the user clicks the Sign In button
    Then the user is authenticated successfully
    And the user is redirected to the Home Dashboard