class MembershipsController < ApplicationController
  
  def new
    @membership = Membership.new()
    @user_options = []
    User.all.each do |user|
      @user_options << [user.email,user.id] unless user == current_user
    end
  end

  def edit
  end

  def show
  end

  def create
    if Dataset.find(params[:dataset_id]).user_id == current_user.id
      @membership = Membership.create!(
        :user_id => params[:user_id],
        :dataset_id => params[:dataset_id]
      )
      redirect_to '/datasets' ,flash: { done: "Success!" }
    else
      redirect_to '/datasets', flash: { error: "Not authorized" }
    end
  end

end
