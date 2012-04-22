class User < ActiveRecord::Base
  has_many :organizations
  has_many :assets
  
  def creating(user_name, organization_name, data)
    # create user if it is not available
    user = User.find({ :name => user_name}) || User.create({ :name => user_name})
    # create org. and user relation if user available
    # create org. if it is available
    org = Organization.find({ :name => organization_name}) || (user.present? ? (Organization.create({ :name => organization_name, :user_id => user }) ) : (Organization.create({ :name => organization_name}) if organization_name.present?))
    (org.present? ? (user.assets << data; org.assets << data) : ( user.assets << data )) if data.present
    return user || org
  end
end
