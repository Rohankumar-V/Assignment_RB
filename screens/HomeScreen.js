import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ItemCard from '../components/ItemCard';
import { fetchItems } from '../redux/actions/itemAction';

const ITEMS_PER_PAGE = 10;

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.items);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterYear, setFilterYear] = useState(null);
  const [visibleItems, setVisibleItems] = useState([]);
  const [page, setPage] = useState(1);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isPaginating, setIsPaginating] = useState(false);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  useEffect(() => {
    if (items.length > 0) {
      applyFiltersAndPagination(page, searchQuery, filterYear);
    }
  }, [items, page, searchQuery, filterYear]);

  const applyFiltersAndPagination = (page, searchQuery, filterYear) => {
    let filteredData = items;

    if (filterYear === 'above2020') {
      filteredData = filteredData.filter((item) => item.year >= 2020);
    } else if (filterYear === 'below2020') {
      filteredData = filteredData.filter((item) => item.year < 2020);
    }

    if (searchQuery) {
      filteredData = filteredData.filter((item) =>
        item.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.model.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    const paginatedData = filteredData.slice(0, page * ITEMS_PER_PAGE);
    setVisibleItems(paginatedData);
    setIsPaginating(false);
  };

  const handleLoadMore = () => {
    if (!isPaginating && visibleItems.length < items.length) {
      setIsPaginating(true);
      setPage((prevPage) => prevPage + 1);
    }
  };

  const renderFooterLoader = () => {
    if (!isPaginating) return null;

    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="#007BFF" />
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  const renderFilterModal = () => (
    <Modal
      visible={isModalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalCloseIcon}
            onPress={() => setModalVisible(false)}
          >
            <Icon name="close" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Filter Options</Text>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => {
              setFilterYear('above2020');
              setModalVisible(false);
            }}
          >
            <Text style={styles.modalButtonText}>2020 & Above model</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => {
              setFilterYear('below2020');
              setModalVisible(false);
            }}
          >
            <Text style={styles.modalButtonText}>Below 2020 model</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => {
              setFilterYear(null);
              setModalVisible(false);
            }}
          >
            <Text style={styles.modalButtonText}>Reset Filters</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search by car name..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity
          style={styles.filterIconContainer}
          onPress={() => setModalVisible(true)}
        >
          <Icon name="filter-alt" size={28} color="#000" />
        </TouchableOpacity>
      </View>

      {renderFilterModal()}

      <FlatList
        data={visibleItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ItemCard
            item={item}
            onPress={() => navigation.navigate('Details', { item })}
          />
        )}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooterLoader}
        ListEmptyComponent={<Text style={styles.emptyText}>No items found</Text>}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchBar: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    backgroundColor: '#fff',
  },
  filterIconContainer: {
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerLoader: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalCloseIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default HomeScreen;
