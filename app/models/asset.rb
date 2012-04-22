class Asset < ActiveRecord::Base
  has_attached_file :data
  belongs_to :user
  belongs_to :organization
  belongs_to :project
end
