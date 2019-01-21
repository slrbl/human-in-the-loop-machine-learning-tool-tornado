# Load the Rails application.
require_relative 'application'

# Initialize the Rails application.
Rails.application.initialize!


if Rack::Utils.respond_to?("key_space_limit=")
  Rack::Utils.key_space_limit = 262144 # 4 times the default size
end
