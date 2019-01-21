require 'test_helper'

class DataControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get data_new_url
    assert_response :success
  end

  test "should get edit" do
    get data_edit_url
    assert_response :success
  end

  test "should get label" do
    get data_label_url
    assert_response :success
  end

end
