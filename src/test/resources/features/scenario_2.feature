Feature: Login Page Functionality

  Scenario: User can successfully sign in with valid credentials
    Given the user is on the login page
    When the user enters a valid username
    And the user enters a valid password
    And the password field is masked
    And the user clicks on the Sign In button
    Then the user should be successfully authenticated
    And the user should be redirected to the Home Dashboard
