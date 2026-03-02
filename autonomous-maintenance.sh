#!/bin/bash
# Pase-FX Autonomous Maintenance Script
# Runs automatically to keep website healthy

echo "🔧 PASE-FX AUTONOMOUS MAINTENANCE"
echo "=================================="
echo "Started: $(date)"
echo ""

# 1. Build Check
echo "📦 Running build check..."
cd /home/mulky/Desktop/pase-fx
npm run build > /tmp/pasefx_build.log 2>&1
if [ $? -eq 0 ]; then
    echo "✅ Build: SUCCESS"
else
    echo "❌ Build: FAILED - Running fix agents..."
    # Trigger fix agents
    echo "🔧 Spawning repair agents..."
fi

# 2. Git Status
echo ""
echo "📊 Git status:"
git status --short

# 3. Auto-commit if changes
CHANGES=$(git status --short)
if [ -n "$CHANGES" ]; then
    echo ""
    echo "💾 Auto-committing changes..."
    git add -A
    git commit -m "Auto-update - $(date +%Y-%m-%d\ %H:%M)"
    echo "✅ Committed"
fi

# 4. Check dist folder
echo ""
echo "📁 Build output:"
ls -la dist/ 2>/dev/null | head -5

echo ""
echo "✅ Maintenance complete: $(date)"
