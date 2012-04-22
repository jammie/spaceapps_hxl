class Organization < ActiveRecord::Base
  belongs_to :user
  has_many :assets
end
