@Scenario_2 @smoke @regression
Feature: User Login

Background: Login to Appian
  Given I launch Chrome browser
  When I navigate to Appian application
  And I login with valid credentials

  Scenario: User can log in successfully with valid credentials
    Given the user navigates to the login page
    Then the login page must display Username field
    And the login page must display Password field
    And the login page must display Sign In button
    When the user enters "validUsername" in the Username field
    And the user enters "validPassword" in the Password field
    Then the Password field must be masked
    When the user clicks the Sign In button
    Then the user must be successfully authenticated
    And the user is redirected to the Home Dashboard