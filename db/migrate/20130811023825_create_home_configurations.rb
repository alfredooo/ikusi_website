class CreateHomeConfigurations < ActiveRecord::Migration
  def change
    create_table :home_configurations do |t|
      t.integer :main_history

      t.timestamps
    end
  end
end
