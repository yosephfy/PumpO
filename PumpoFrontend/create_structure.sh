#!/bin/bash

# Create the main app directory
mkdir -p app

# Function to create a directory with a _layout.tsx file
create_group() {
  local group_path=$1
  mkdir -p "$group_path"
  touch "$group_path/_layout.tsx"
}

# Function to create a file within a group
create_file() {
  local file_path=$1
  touch "$file_path"
}

# Create groups and their files
create_group "app/(auth)"
create_file "app/(auth)/login.tsx"
create_file "app/(auth)/register.tsx"

create_group "app/(feed)"
create_file "app/(feed)/index.tsx"
create_file "app/(feed)/videos.tsx"
create_file "app/(feed)/progress-updates.tsx"
create_file "app/(feed)/today-workout.tsx"
create_file "app/(feed)/educational.tsx"

create_group "app/(profile)"
create_file "app/(profile)/index.tsx"
create_file "app/(profile)/edit.tsx"
create_file "app/(profile)/settings.tsx"

create_group "app/(community)"
create_file "app/(community)/index.tsx"
create_file "app/(community)/forums.tsx"

# Create nested group for community/groups
create_group "app/(community)/groups"
create_file "app/(community)/groups/index.tsx"
create_file "app/(community)/groups/create-group.tsx"

create_group "app/(marketplace)"
create_file "app/(marketplace)/index.tsx"
create_file "app/(marketplace)/products.tsx"
create_file "app/(marketplace)/shops.tsx"

create_group "app/(nutrition)"
create_file "app/(nutrition)/index.tsx"
create_file "app/(nutrition)/recipes.tsx"
create_file "app/(nutrition)/meal-plans.tsx"

create_group "app/(challenges)"
create_file "app/(challenges)/index.tsx"
create_file "app/(challenges)/leaderboards.tsx"
create_file "app/(challenges)/badges.tsx"

create_group "app/(live)"
create_file "app/(live)/index.tsx"
create_file "app/(live)/interactive-workouts.tsx"

# Create app-wide files
touch app/_layout.tsx
touch app/+not-found.tsx

echo "Project structure created successfully!"
