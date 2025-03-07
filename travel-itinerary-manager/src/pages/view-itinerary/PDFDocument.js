import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { pdf } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#f9fafb',
  },
  coverImageContainer: {
    height: 250,
    marginBottom: 20,
    borderRadius: 8,
    overflow: 'hidden',
  },
  coverImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  tripCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  tripHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  tripTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  tripInfo: {
    color: '#666',
    fontSize: 12,
    marginTop: 5,
  },
  costContainer: {
    alignItems: 'flex-end',
  },
  costLabel: {
    color: '#666',
    fontSize: 12,
  },
  costValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dayHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 10,
  },
  activityCard: {
    borderLeftWidth: 4,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryLabel: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    marginRight: 5,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  activityTime: {
    color: '#666',
    fontSize: 10,
  },
  activityDescription: {
    color: '#4b5563',
    fontSize: 12,
    marginTop: 5,
    marginBottom: 5,
  },
  activityLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    color: '#666',
    fontSize: 10,
    marginTop: 5,
  },
  locationIcon: {
    width: 10,
    height: 10,
    marginRight: 5,
  },
  activityNote: {
    backgroundColor: '#f9fafb',
    padding: 8,
    borderRadius: 4,
    marginTop: 5,
    fontSize: 10,
    color: '#666',
  },
  pageNumber: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 10,
    color: '#666',
  },
  iconPlaceholder: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 5,
  },
});


const getCategoryColor = (category) => {
  const categoryColors = {
    LODGING: '#8b5cf6',
    DINING: '#ef4444',
    TRANSPORT: '#3b82f6',
    SIGHTSEEING: '#10b981',
    OTHER: '#f59e0b',
  };
  
  return categoryColors[category] || '#f59e0b';
};


const formatCategory = (category) => {
  return category.charAt(0) + category.slice(1).toLowerCase();
};


const PDFDocument = ({ tripData }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Cover Image */}
        <View style={styles.coverImageContainer}>
          {tripData.images && tripData.images.length > 0 ? (
            <Image src={tripData.images[0]} style={styles.coverImage} />
          ) : (
            <Image src="https://picsum.photos/800/400" style={styles.coverImage} />
          )}
        </View>
        
        
        <View style={styles.tripCard}>
          <View style={styles.tripHeader}>
            <View>
              <Text style={styles.tripTitle}>{tripData.name}</Text>
              <Text style={styles.tripInfo}>{tripData.duration} Days</Text>
            </View>
            <View style={styles.costContainer}>
              <Text style={styles.costLabel}>Total Cost</Text>
              <Text style={styles.costValue}>${tripData.totalCost}</Text>
            </View>
          </View>
        </View>
        
        
        {tripData.days.map((day) => (
          <View key={`day-${day.day}`} wrap={false}>
            <Text style={styles.dayHeader}>Day {day.day}</Text>
            
            {day.activities.map((activity, idx) => (
              <View 
                key={`activity-${day.day}-${idx}`} 
                style={[
                  styles.activityCard, 
                  { borderLeftColor: getCategoryColor(activity.category) }
                ]}
              >
                <View style={styles.activityHeader}>
                  <View>
                    <View style={styles.categoryHeader}>
                      <View style={[styles.categoryLabel, { backgroundColor: getCategoryColor(activity.category) }]} />
                      <Text style={styles.activityTitle}>
                        {formatCategory(activity.category)}: {activity.title}
                      </Text>
                    </View>
                    <Text style={styles.activityDescription}>{activity.description}</Text>
                    
                    <View style={styles.activityLocation}>
                      <View style={[styles.iconPlaceholder, { backgroundColor: '#666' }]} />
                      <Text>{activity.location}</Text>
                    </View>
                  </View>
                  <Text style={styles.activityTime}>{activity.time}</Text>
                </View>
                
                {activity.notes && (
                  <View style={styles.activityNote}>
                    <Text>Note: {activity.notes}</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        ))}
        
       
        <Text 
          style={styles.pageNumber} 
          render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} 
          fixed 
        />
      </Page>
    </Document>
  );
};

export default PDFDocument;